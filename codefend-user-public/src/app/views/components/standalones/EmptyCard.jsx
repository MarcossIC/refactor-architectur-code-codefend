import React from "react";
import "../../shared/card.scss";

const EmptyCard = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex items-center empty-card">
        <div className="flex items-center grow contents-wrapper gap-x-5">
          <img
            src="/codefend/not-allowed.svg"
            alt="Not allowed icon"
            loading="lazy"
            className="w-20 h-20"
          />

          <div className="flex flex-col gap-y-2">
            <span className="flex flex-col gap-y-2">
              Thre's no data to display here.
            </span>
            <span className="second-text">
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
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCard;
