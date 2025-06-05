import AbstractSeeder from "./AbstractSeeder";

class ArticleSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "article", truncate: true });
  }

  // The run method - Populate the 'article' table with fake data

  run() {
    // Generate and insert fake data into the 'article' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake article data
      const fakeArticle = {
        title: this.faker.lorem.sentence(3),
        content: this.faker.lorem.paragraphs(3),
      };

      // Insert the fakeArticle data into the 'article' table
      this.insert(fakeArticle); // insert into article(title, content) values (?, ?)
    }
  }
}

// Export the ArticleSeeder class
export default ArticleSeeder;
