const CARD_COLORS = [
	'#f9f5e3', // soft yellow
	'#e3f6f9', // soft blue
	'#f9e3f6', // soft pink
	'#e3f9e7', // soft green
	'#f6f3e3', // cream
	'#f3e3f9', // lavender
	'#e3eaf9', // light blue
	'#f9e9e3', // peach
];

function ProductList({ products }) {
	return (
		<ul className="product-list">
			{products.map((product, index) => (
				<li
					className="product-item"
					key={product.id}
					style={{ background: CARD_COLORS[index % CARD_COLORS.length] }}
				>
					<div className="product-image-wrap">
						<img src={product.image} alt={product.title} loading="lazy" />
					</div>
					<div className="product-details">
						<h3>{product.title}</h3>
						<p className="product-desc">{product.description}</p>
						<p className="product-price">${product.price.toFixed(2)}</p>
					</div>
				</li>
			))}
		</ul>
	);
}

export default ProductList;
