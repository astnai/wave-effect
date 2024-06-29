const frame = `
  GGGGGGGGGGG                   PPPPPPPPPPPPPPPPP              TTTTTTTTTTTTTTTTTTTTTTT
 GGG:::::::::::G                P::::::::::::::::P             T:::::::::::::::::::::T
GG:::::::::::::::G              P::::::PPPPPP:::::P            T:::::::::::::::::::::T
G:::::GGGGGGGG::::G             PP:::::P     P:::::P           T:::::TT:::::::TT:::::T
G:::::G       GGGGGG              P::::P     P:::::P           TTTTTT  T:::::T  TTTTTT
G:::::G                           P::::P     P:::::P                   T:::::T
G:::::G                           P::::PPPPPP:::::P                    T:::::T
G:::::G    GGGGGGGGGG             P:::::::::::::PP                     T:::::T
G:::::G    G::::::::G             P::::PPPPPPPPP                       T:::::T
G:::::G    GGGGG::::G             P::::P                               T:::::T
G:::::G        G::::G             P::::P                               T:::::T
G:::::G       G::::G              P::::P                               T:::::T
 G:::::GGGGGGGG::::G            PP::::::PP                           TT:::::::TT
  GG:::::::::::::::G            P::::::::P                           T:::::::::T
    GGG::::::::::::G            P::::::::P                           T:::::::::T
       GGGGGGGGGGGGG            PPPPPPPPPP                           TTTTTTTTTTT`;

const colors = [
  "\x1b[38;5;232m", // Black
  "\x1b[38;5;233m", // Dark Gray 1
  "\x1b[38;5;234m", // Dark Gray 2
  "\x1b[38;5;235m", // Dark Gray 3
  "\x1b[38;5;236m", // Dark Gray 4
  "\x1b[38;5;237m", // Dark Gray 5
  "\x1b[38;5;238m", // Dark Gray 6
  "\x1b[38;5;239m", // Dark Gray 7
  "\x1b[38;5;240m", // Dark Gray 8
  "\x1b[38;5;241m", // Dark Gray 9
  "\x1b[38;5;242m", // Light Gray 1
  "\x1b[38;5;243m", // Light Gray 2
  "\x1b[38;5;244m", // Light Gray 3
  "\x1b[38;5;245m", // Light Gray 4
  "\x1b[38;5;246m", // Light Gray 5
  "\x1b[38;5;247m", // Light Gray 6
  "\x1b[38;5;248m", // Light Gray 7
  "\x1b[38;5;249m", // Light Gray 8
  "\x1b[38;5;250m", // Light Gray 9
  "\x1b[38;5;251m", // Light Gray 10
  "\x1b[38;5;252m", // White
  "\x1b[0m", // Reset
];

const applyOpacityEffect = (frame, time) => {
  let result = "";
  const rows = frame.split("\n");
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      const char = rows[i][j];
      const distance = Math.sqrt(i * i + j * j);
      const wave = Math.sin(distance * 0.3 - time);
      const colorIndex = Math.floor(((wave + 1) / 2) * (colors.length - 1));
      const color = colors[colorIndex];
      result += `${color}${char}\x1b[0m`;
    }
    result += "\n";
  }
  return result;
};

let time = 0;

const animate = () => {
  const frameWithOpacity = applyOpacityEffect(frame, time);
  process.stdout.write("\x1b[H\x1b[2J");
  process.stdout.write(frameWithOpacity);
  time += 0.07;
  if (time > 2 * Math.PI) {
    time -= 2 * Math.PI;
  }
};

setInterval(animate, 30);
