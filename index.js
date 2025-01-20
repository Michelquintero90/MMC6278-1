const { program } = require("commander");
const fs = require("fs/promises");
const chalk = require("chalk");
const QUOTE_FILE = "quotes.txt";

program
  .name("quotes")
  .description("CLI tool for inspiration")
  .version("0.1.0");

program
  .command("getQuote")
  .description("Retrieves a random quote")
  .action(async () => {
    try {
      const data = await fs.readFile(QUOTE_FILE, "utf8");
      const quotes = data.split("\n").filter(line => line.trim() !== "");
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      const [quote, author] = randomQuote.split("|");
      console.log(chalk.green(`"${quote.trim()}"`));
      console.log(chalk.cyan(`- ${author.trim()}`));
    } catch (error) {
      console.error(chalk.red("Error reading quotes file"));
    }
  });

program
  .command("addQuote <quote> [author]")
  .description("adds a quote to the quote file")
  .action(async (quote, author = "Anonymous") => {
    try {
      const data = await fs.readFile(QUOTE_FILE, "utf8");
      const newQuote = `${quote} | ${author}\n`;
      await fs.appendFile(QUOTE_FILE, newQuote);
      console.log(chalk.green("Quote added successfully!"));
    } catch (error) {
      console.error(chalk.red("Error adding quote to file"));
    }
  });

program.parse();
