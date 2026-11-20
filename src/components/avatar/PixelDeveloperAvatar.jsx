import { useState, useEffect, useRef } from 'react';
import { RefreshCw, Upload } from 'lucide-react';

/**
 * Custom 40x40 (2x Resolution) Pixel-Art Developer Avatar Component
 * Features:
 * - Sharp 40x40 SVG matrix rendered in CMD Phosphor Green tones
 * - Natural eye blink animation cycle
 * - 3 Style presets (Specs, Headset, Hoodie)
 * - Live photo-to-pixel canvas converter (transforms any uploaded photo into a 40x40 CMD green dithered sprite)
 * - Floating HUD badges & CRT scanline overlay
 */
export default function PixelDeveloperAvatar() {
  const [presetIndex, setPresetIndex] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [uploadedPixelGrid, setUploadedPixelGrid] = useState(null);
  const fileInputRef = useRef(null);

  // Periodic natural eye blink animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3400);
    return () => clearInterval(blinkInterval);
  }, []);

  // CMD Phosphor Green shading palette for 40x40 detail
  const palette = {
    '.': 'transparent',
    'K': '#040705', // Deepest outline
    'D': '#0B1711', // Dark hair / shadow
    'H': '#12291D', // Hair mid-tone
    'G': '#166534', // Dark emerald clothing
    'M': '#22C55E', // Medium phosphor green
    'B': '#00FF41', // Bright CMD green accent
    'S': '#86EFAC', // Light phosphor skin tone
    'W': '#DCFCE7', // Brightest highlight
    'E': '#050907', // Pupil / dark glass
  };

  // Upscale a 20x20 base sprite to 40x40 with corner/detail refinement
  const build40x40Sprite = (variant) => {
    const base20 =
      variant === 0
        ? [
            '......KKKKKKKK......',
            '.....KDDDDDDDDK.....',
            '....KDDBBBBBBDDK....',
            '...KDDBHHHHHHBDDK...',
            '...KDBBBBBBBBBBDK...',
            '...KDSWWWWWWWWDDK...',
            '..KSDSWWWWWWWWSWDK..',
            '..KSEEEEKSSKEEEESK..',
            '..KSEBBEKSSKEBBESK..',
            '..KSEEEEKKKKEEEESK..',
            '..KSSWWWWWWWWWWSSK..',
            '...KSSSWWKKWWSSSK...',
            '...KSSSSWWWWSSSSK...',
            '....KKSSSSSSSSKK....',
            '...KGGKKKKKKKKGGK...',
            '..KGGGGMBBBBMGGGGK..',
            '.KGGGGMBBBBBBMGGGGK.',
            '.KGGGMBBBKKBBBMGGGK.',
            'KGGGGMBBKKKKBBMGGGGK',
            'KKKKKKKKKKKKKKKKKKKK',
          ]
        : variant === 1
        ? [
            '.....KKKKKKKKKK.....',
            '....KBBBBBBBBBBK....',
            '...KBBDDDDDDDDBBK...',
            '..KBBDDHHHHHHDDBBK..',
            '.KMBDDHHHHHHHHHDBMK.',
            '.KMBDSWWWWWWWWSHBMK.',
            'KMMBDSWWWWWWWWSHBMMK',
            'KMMBSWEEWWWWEEWSBMMK',
            'KMMBSWBBWWWWBBSWBMMK',
            'KMMBSWWWWWWWWWWWBMMK',
            '.KMBSSWWWWWWWWSSBMK.',
            '.KMBBSSSSKKSSSSBBMK.',
            '..KKKSSSSSSSSSSKKK..',
            '....KKSSSSSSSSKK....',
            '...KDDKKKKKKKKDDK...',
            '..KDDDDBBBBBBDDDDK..',
            '.KDDDDBGGGGGGGBDDDK.',
            '.KDDDBGGKKKKGGBDDDK.',
            'KDDDDBGKKKKKKGBDDDDK',
            'KKKKKKKKKKKKKKKKKKKK',
          ]
        : [
            '.....KKKKKKKKKK.....',
            '....KGGGGGGGGGGK....',
            '...KGGGBBBBBBBBGGK..',
            '..KGGBBDDDDDDDDBBGK.',
            '..KGBDDDDDDDDDDDDBGK',
            '..KGBDSWWWWWWWWSHBGK',
            '..KGBSWWWWWWWWWWSBGK',
            '..KGBSWEEKSSKEEWSSGK',
            '..KGBSWBBKSSKBBWSBGK',
            '..KGBSWWWWWWWWWWSBGK',
            '..KGBSSWWWWWWWWSSBGK',
            '...KGBSSSWWWWSSSBGK.',
            '...KGGBSSSSSSSSBGGK.',
            '....KGGKKKKKKKKGGK..',
            '...KGGGMBBBBBBMGGGK.',
            '..KGGGGMBGGGGMBGGGGK',
            '.KGGGGMBGKKKKGBMGGGG',
            '.KGGGMBGKKKKKKGBMGGG',
            'KGGGGMBKKKKKKKKBMGGG',
            'KKKKKKKKKKKKKKKKKKKK',
          ];

    const grid40 = [];
    for (let y = 0; y < 20; y++) {
      let rowA = '';
      let rowB = '';
      for (let x = 0; x < 20; x++) {
        const ch = base20[y][x];
        const up = y > 0 ? base20[y - 1][x] : '.';
        const down = y < 19 ? base20[y + 1][x] : '.';
        const left = x > 0 ? base20[y][x - 1] : '.';
        const right = x < 19 ? base20[y][x + 1] : '.';

        const tl = ch === '.' && up !== '.' && left !== '.' ? up : ch;
        const tr = ch === '.' && up !== '.' && right !== '.' ? up : ch;
        const bl = ch === '.' && down !== '.' && left !== '.' ? down : ch;
        const br = ch === '.' && down !== '.' && right !== '.' ? down : ch;

        rowA += tl + tr;
        rowB += bl + br;
      }
      grid40.push(rowA, rowB);
    }
    return grid40;
  };

  const presets = [
    { name: 'Dev_01 // Specs [40x40]', grid: build40x40Sprite(0) },
    { name: 'Dev_02 // Headset [40x40]', grid: build40x40Sprite(1) },
    { name: 'Dev_03 // Hoodie [40x40]', grid: build40x40Sprite(2) },
  ];

  // Converts uploaded image into a crisp 40x40 CMD green dithered pixel grid
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const size = 40;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.imageSmoothingEnabled = false;

        const minDim = Math.min(img.width, img.height);
        const sx = (img.width - minDim) / 2;
        const sy = (img.height - minDim) / 2;
        ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);

        const imgData = ctx.getImageData(0, 0, size, size).data;
        const newGrid = [];

        for (let y = 0; y < size; y++) {
          let rowStr = '';
          for (let x = 0; x < size; x++) {
            const idx = (y * size + x) * 4;
            const r = imgData[idx];
            const g = imgData[idx + 1];
            const b = imgData[idx + 2];
            const a = imgData[idx + 3];

            if (a < 100) {
              rowStr += '.';
              continue;
            }

            const lum = 0.299 * r + 0.587 * g + 0.114 * b;
            if (lum < 35) rowStr += 'K';
            else if (lum < 68) rowStr += 'D';
            else if (lum < 102) rowStr += 'H';
            else if (lum < 136) rowStr += 'G';
            else if (lum < 170) rowStr += 'M';
            else if (lum < 204) rowStr += 'B';
            else if (lum < 232) rowStr += 'S';
            else rowStr += 'W';
          }
          newGrid.push(rowStr);
        }
        setUploadedPixelGrid(newGrid);
      };
      img.src = event.target?.result;
    };
    reader.readAsDataURL(file);
  };

  const activeGrid = uploadedPixelGrid || presets[presetIndex].grid;

  const cyclePreset = () => {
    setUploadedPixelGrid(null);
    setPresetIndex((prev) => (prev + 1) % presets.length);
  };

  return (
    <div className="group relative w-full max-w-[320px] aspect-square select-none flex items-center justify-center">
      {/* Phosphor radial backlight */}
      <div
        className="absolute -inset-6 rounded-full opacity-25 blur-2xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00FF41 0%, transparent 68%)' }}
      />

      {/* Terminal CAD crosshair marks */}
      <div className="hidden sm:block absolute -left-5 top-1/2 w-5 h-[1px] bg-[#00FF41]/30 pointer-events-none" />
      <div className="hidden sm:block absolute right-6 -top-4 w-[1px] h-4 bg-[#00FF41]/30 pointer-events-none" />

      {/* Floating Top-Right Skill Box */}
      <div className="hidden sm:block absolute -top-3 -right-3 z-20 bg-[#0A0F0D]/90 backdrop-blur-xs border border-[#00FF41]/35 px-2.5 py-1.5 rounded text-[9px] font-mono text-[#86EFAC] leading-relaxed shadow-lg pointer-events-none">
        <div className="text-[#00FF41] font-semibold">Java</div>
        <div>DSA</div>
        <div>System Design</div>
        <div>Web Dev</div>
      </div>

      {/* Frameless 40x40 Pixel Image */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {/* CRT Scanline Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-15 z-10"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 3px, #00FF41 3px, #00FF41 4px)',
          }}
        />

        {/* 40x40 SVG Pixel Matrix */}
        <svg
          viewBox="0 0 40 40"
          className="w-full h-full drop-shadow-[0_0_22px_rgba(0,255,65,0.22)]"
          style={{ imageRendering: 'pixelated' }}
          shapeRendering="crispEdges"
          aria-label="40x40 Pixel art developer avatar"
        >
          {activeGrid.map((row, y) =>
            row.split('').map((cell, x) => {
              let effectiveCell = cell;
              if (!uploadedPixelGrid && isBlinking && y >= 14 && y <= 17) {
                if (cell === 'B' || cell === 'E') {
                  effectiveCell = 'S';
                }
              }
              const fill = palette[effectiveCell] || 'transparent';
              if (fill === 'transparent') return null;
              return (
                <rect
                  key={`${x}-${y}`}
                  x={x}
                  y={y}
                  width="1"
                  height="1"
                  fill={fill}
                />
              );
            })
          )}
        </svg>

        {/* Floating Controls (unobtrusive at bottom corner / hover) */}
        <div className="absolute bottom-1.5 right-1.5 z-20 flex items-center gap-1.5 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={cyclePreset}
            className="flex items-center gap-1 px-2 py-1 rounded bg-[#070B09]/90 hover:bg-[#111E17] border border-[#00FF41]/40 text-[#00FF41] text-[9px] font-mono shadow-md backdrop-blur-xs transition-colors cursor-pointer"
            title="Cycle random pixel appearance"
          >
            <RefreshCw className="w-2.5 h-2.5" />
            <span>Randomize</span>
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1 px-2 py-1 rounded bg-[#070B09]/90 hover:bg-[#111E17] border border-[#00FF41]/40 text-[#86EFAC] text-[9px] font-mono shadow-md backdrop-blur-xs transition-colors cursor-pointer"
            title="Upload your photo to convert to 40x40 CMD pixels"
          >
            <Upload className="w-2.5 h-2.5" />
            <span>Photo→Pixel</span>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}
