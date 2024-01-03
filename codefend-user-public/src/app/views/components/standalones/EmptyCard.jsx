import React from "react";

const EmptyCard = () => {
  return (
    <div className="empty-card">
      <div className="container">
        <div className="content-wrapper">
          <img
            src="/codefend/not-allowed.svg"
            alt="Not allowed icon"
            loading="lazy"
            width="5rem"
            height="5rem"
          />

          <div className="content">
            <p class="first-text">There's no data to display here.</p>
            <p className="second-text">
              If you just placed an order please allow our team to work.
              <br />
              for a few hours before getting the first results.
              <a
                class="codefend-text-red"
                href="mailto:cs@codefend.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                {" "}
                Send email.
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCard;
