import { useEffect, useState } from "react";

type Article = {
	id: number;
	title: string;
	content: string;
};

function App() {
	const [articles, setArticles] = useState<Article[]>([]);

	useEffect(() => {
		fetch("http://localhost:3310/api/articles")
			.then((res) => res.json())
			.then((data) => setArticles(data));
	}, []);

	return (
		<section>
			<h1>Mes articles</h1>
			<ul>
				{articles.map((article) => (
					<article key={article.id}>
						<h2>{article.title}</h2>
						<p>{article.content}</p>
					</article>
				))}
			</ul>
		</section>
	);
}

export default App;
