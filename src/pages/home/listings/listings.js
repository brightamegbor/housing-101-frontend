import React, { Component } from "react";

class Listings extends Component {
  componentDidMount() {
    var scrollpos = window.scrollY;
    var navbar = document.querySelector("nav");

    function add_class_on_scroll() {
      navbar.classList.remove("navbar-dark", "bg-dark", "shadow");
      navbar.classList.add("navbar-light", "bg-light", "shadow");
    }

    function remove_class_on_scroll() {
      navbar.classList.remove("navbar-light", "bg-light", "shadow");
      navbar.classList.add("navbar-dark", "bg-dark");
    }

    window.addEventListener("scroll", function () {
      scrollpos = window.scrollY;

      if (scrollpos > 60) {
        add_class_on_scroll();
      } else {
        remove_class_on_scroll();
      }
    });
  }

  render() {
    return (
      <div>
        <p>--- Listing goes here ---</p>
      </div>
    );
  }
}

export default Listings;
