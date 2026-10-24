import { NavLink } from 'react-router-dom'

function NavLinks({ cartCount }) {
	return (
		<nav className="site-nav" aria-label="Main navigation">
			<NavLink to="/" end>Home</NavLink>
			<NavLink to="/about">About</NavLink>
			<NavLink to="/products">Products</NavLink>
			<NavLink to="/account">Account</NavLink>
			<NavLink
				className="cart-nav-link"
				to="/cart"
				aria-label={`Shopping cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
			>
				Cart <span className="cart-nav-count">{cartCount}</span>
			</NavLink>
		</nav>
	)
}

export default NavLinks
