import chalk from "chalk";

export function isValidHexColor(hexColor: string): boolean {
  // Check if it has a hash and is of length 7 or is of length 6 (without a hash)
  // And also check if it's a valid hex number
  return /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(hexColor);
}

function shadeColor(color: string, percent: number): string {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const red = (num >> 16) + amt;
  const green = ((num >> 8) & 0x00ff) + amt;
  const blue = (num & 0x0000ff) + amt;

  return (
    "#" +
    (
      0x1000000 +
      (red < 255 ? (red < 1 ? 0 : red) : 255) * 0x10000 +
      (green < 255 ? (green < 1 ? 0 : green) : 255) * 0x100 +
      (blue < 255 ? (blue < 1 ? 0 : blue) : 255)
    )
      .toString(16)
      .slice(1)
  );
}

export function generateTailwindShades(hexColor: string) {
  const returnal = {
    100: shadeColor(hexColor, 40),
    200: shadeColor(hexColor, 30),
    300: shadeColor(hexColor, 20),
    400: shadeColor(hexColor, 10),
    500: hexColor,
    600: shadeColor(hexColor, -10),
    700: shadeColor(hexColor, -20),
    800: shadeColor(hexColor, -30),
    900: shadeColor(hexColor, -40),
  };

  return `{
  100: ${chalk.bgHex(returnal[100])(returnal[100])},
  200: ${chalk.bgHex(returnal[200])(returnal[200])},
  300: ${chalk.bgHex(returnal[300])(returnal[300])},
  400: ${chalk.bgHex(returnal[400])(returnal[400])},
  500: ${chalk.bgHex(returnal[500])(returnal[500])},
  600: ${chalk.bgHex(returnal[600])(returnal[600])},
  700: ${chalk.bgHex(returnal[700])(returnal[700])},
  800: ${chalk.bgHex(returnal[800])(returnal[800])},
  900: ${chalk.bgHex(returnal[900])(returnal[900])},
}`;
}
