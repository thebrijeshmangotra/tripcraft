import { Monitor, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTheme } from "next-themes";

interface GeneratorType {
  next: () => string;
  value: [string];
}

export function ThemeToggler() {
  const { theme, setTheme } = useTheme();

  function myGenerator() {
    switch (theme) {
      case "light":
        setTheme("dark");
        break;
      case "dark":
        setTheme("system");
        break;
      case "system":
        setTheme("light");
        break;
      default:
        setTheme("light");
        break;
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className="w-10 h-10"
      onClick={myGenerator}
    >
      {theme == "light" && <Sun />}
      {theme == "dark" && (
        <Moon className="dark:text-foreground transaition-all" />
      )}
      {theme == "system" && <Monitor />}
    </Button>
  );
}
