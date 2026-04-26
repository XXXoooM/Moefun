export interface SizeConfig {
  scale: number;
  width: number;
  padding: number;
  contentWidth: number;
}

export interface PosterConfig {
  coverHeight: number;
  titleHeight: number;
  descHeight: number;
  canvasHeight: number;
}

export interface DateObj {
  year: string;
  month: string;
  day: string;
}

export function loadImage(url: string, timeoutMs = 3000): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    const timer = setTimeout(() => {
      reject(new Error(`Image load timeout: ${url}`));
    }, timeoutMs);
    img.onload = () => {
      clearTimeout(timer);
      resolve(img);
    };
    img.onerror = () => {
      clearTimeout(timer);
      reject(new Error(`Failed to load image: ${url}`));
    };
    img.src = url;
  });
}

export function parseDate(dateStr: string): DateObj | null {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return null;
    
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return {
      year: date.getFullYear().toString(),
      month: months[date.getMonth()],
      day: date.getDate().toString().padStart(2, "0")
    };
  } catch (e) {
    return null;
  }
}

export function getLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(""); // Split by character for better CJK support
  const lines: string[] = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + word).width;
    if (width < maxWidth) {
      currentLine += word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}

export function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

export function calculateDimensions(
  hasCover: boolean,
  title: string,
  description: string,
  ctx: CanvasRenderingContext2D,
  config: SizeConfig
): PosterConfig {
  const { scale, contentWidth, padding } = config;
  
  const coverHeight = hasCover ? 240 * scale : 120 * scale;
  
  // Title height
  const titleFontSize = 24 * scale;
  const titleLineHeight = 32 * scale;
  ctx.font = `700 ${titleFontSize}px sans-serif`;
  const titleLines = getLines(ctx, title, contentWidth);
  const titleHeight = titleLines.length * titleLineHeight;
  
  // Description height
  let descHeight = 0;
  if (description) {
    const descFontSize = 14 * scale;
    const descLineHeight = 24 * scale;
    ctx.font = `${descFontSize}px sans-serif`;
    const descLines = getLines(ctx, description, contentWidth - 16 * scale);
    descHeight = Math.min(descLines.length, 6) * descLineHeight;
  }
  
  const footerHeight = 160 * scale;
  const canvasHeight = coverHeight + padding + titleHeight + (description ? 16 * scale + descHeight : 0) + 40 * scale + footerHeight;
  
  return {
    coverHeight,
    titleHeight,
    descHeight,
    canvasHeight
  };
}

export function drawDecorativeCircles(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  color: string,
  scale: number
) {
  ctx.save();
  ctx.globalAlpha = 0.05;
  ctx.fillStyle = color;
  
  // Top right
  ctx.beginPath();
  ctx.arc(width, 0, 150 * scale, 0, Math.PI * 2);
  ctx.fill();
  
  // Bottom left
  ctx.beginPath();
  ctx.arc(0, height, 100 * scale, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.restore();
}

export function drawDateBadge(
  ctx: CanvasRenderingContext2D,
  date: DateObj,
  padding: number,
  coverHeight: number,
  scale: number,
  fontFamily: string,
  isDark: boolean
) {
  const badgeWidth = 50 * scale;
  const badgeHeight = 60 * scale;
  const x = padding;
  const y = coverHeight - badgeHeight / 2;
  
  ctx.save();
  // Shadow
  ctx.shadowColor = "rgba(0,0,0,0.2)";
  ctx.shadowBlur = 10 * scale;
  ctx.shadowOffsetY = 4 * scale;
  
  // Background
  ctx.fillStyle = isDark ? "rgba(40, 40, 40, 0.9)" : "rgba(255, 255, 255, 0.9)";
  drawRoundedRect(ctx, x, y, badgeWidth, badgeHeight, 8 * scale);
  ctx.fill();
  ctx.shadowColor = "transparent";
  
  // Day
  ctx.fillStyle = isDark ? "#eee" : "#111";
  ctx.font = `bold ${24 * scale}px ${fontFamily}`;
  ctx.textAlign = "center";
  ctx.fillText(date.day, x + badgeWidth / 2, y + 30 * scale);
  
  // Month & Year
  ctx.fillStyle = isDark ? "#aaa" : "#666";
  ctx.font = `${10 * scale}px ${fontFamily}`;
  ctx.fillText(`${date.month} ${date.year}`, x + badgeWidth / 2, y + 48 * scale);
  
  ctx.restore();
}
