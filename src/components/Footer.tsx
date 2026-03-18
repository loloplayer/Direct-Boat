const Footer = () => (
  <footer className="bg-primary py-12">
    <div className="container mx-auto px-6 text-center">
      <p className="font-display text-xl text-primary-foreground mb-4">Marbella Horizonte</p>
      <p className="font-body text-sm text-primary-foreground/50">
        © {new Date().getFullYear()} Marbella Horizonte. Todos los derechos reservados.
      </p>
    </div>
  </footer>
);

export default Footer;
