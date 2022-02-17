export function LandingFooter() {
  return (
    <div className="container mt-5 mb-5 pt-5 footer">
      <div className="">
        <a className="me-3" href="/#">
          <i className="fab fa-facebook"></i>
        </a>
        <a className="me-3" href="/#">
          <i className="fab fa-twitter"></i>
        </a>
        <a className="me-3 youtube-icon" href="/#">
          <i className="fab fa-youtube"></i>
        </a>
        <a className="me-3" href="/#">
          <i className="fab fa-instagram"></i>
        </a>
      </div>

      <div className="">
        Copyright &copy;{new Date().getFullYear()} . Housing . All rights
        reserved
      </div>

      <div className="">
        <a className="me-1" href="/contact">
          Contact Support
        </a>
        |
        <a className="ms-1 me-1" href="/terms">
          Terms
        </a>
        |
        <a className="ms-1 me-1" href="/privacy">
          Privacy Policy
        </a>
      </div>
    </div>
  );
}
