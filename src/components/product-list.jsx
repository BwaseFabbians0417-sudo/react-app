import { useState } from 'react';
import { Link } from 'react-router-dom';
import NotFound from './NotFound';

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

function ProductCard({ product, background, quantity, onAddToCart }) {
	return (
		<li className="product-item" style={{ background }}>
			<Link
				className="product-card"
				to={`/product${product.id}`}
			>
				<span className="product-image-wrap">
					<img src={product.image} alt="" loading="lazy" />
				</span>
				<span className="product-details">
					<span className="product-title">{product.title}</span>
				</span>
			</Link>
			<div className="product-purchase-row">
				<span className="product-price">${product.price.toFixed(2)}</span>
				<button
					className="add-to-cart-button"
					type="button"
					aria-label={`Add ${product.title} to cart`}
					onClick={() => onAddToCart(product.id)}
				>
					Add to cart
					{quantity > 0 && <span className="cart-quantity">{quantity}</span>}
				</button>
			</div>
		</li>
	);
}

function ProductList({ products, cart, cartCount, onAddToCart }) {
	const [search, setSearch] = useState('');
	const normalizedSearch = search.trim().toLowerCase();
	const productIdQuery = normalizedSearch.match(/^(?:product\s*#?|#)?\s*(\d+)$/)?.[1];
	const filteredProducts = products.filter((product) => {
		if (productIdQuery) return String(product.id) === productIdQuery;
		if (!normalizedSearch) return true;

		return `${product.title} ${product.category} ${product.description}`
			.toLowerCase()
			.includes(normalizedSearch);
	});

	return (
		<div>
			<p className="product-cart-summary" aria-live="polite">Cart: {cartCount} {cartCount === 1 ? 'item' : 'items'}</p>
			<label className="product-search">
				<span aria-hidden="true">⌕</span>
				<span className="visually-hidden">Search products by name, category, or product number</span>
				<input
					type="search"
					value={search}
					placeholder="Search products or enter product5"
					onChange={(event) => setSearch(event.target.value)}
				/>
				{search && (
					<button type="button" onClick={() => setSearch('')} aria-label="Clear product search">
						&times;
					</button>
				)}
			</label>
			{filteredProducts.length > 0 ? (
				<ul className="product-list">
					{filteredProducts.map((product, index) => (
						<ProductCard
							key={product.id}
							product={product}
							background={CARD_COLORS[index % CARD_COLORS.length]}
							quantity={cart[product.id] ?? 0}
							onAddToCart={onAddToCart}
						/>
					))}
				</ul>
			) : (
				<NotFound
					title="No matching products"
					message="We couldn't find a product with that name or number. Check the spelling or browse the full collection."
					searchTerm={search}
					onClearSearch={() => setSearch('')}
				/>
			)}
		</div>
	);
}

export default ProductList;
