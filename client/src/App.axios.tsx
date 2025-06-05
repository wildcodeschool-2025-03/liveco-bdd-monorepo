import { useEffect, useState } from "react";
import axios from "./services/axios";

type Article = {
	id: number;
	title: string;
	content: string;
};

function App() {
	const [articles, setArticles] = useState<Article[]>([]);

	const fetchArticles = async () => {
		try {
			const response = await axios.get("/api/articles");

			setArticles(response.data);
		} catch (error) {
			console.error("Error fetching articles:", error);
		}
	};

	useEffect(() => {
		fetchArticles();
		return () => {
			setArticles([]);
		};
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
