import React from 'react';
import { Link } from 'react-router-dom';

export default function LfAbout() {
  return (
    <div className="lf-container">
      <div className="lf-page-header">
        <h2>About Lost & Found</h2>
      </div>

      <div className="lf-about">
        <section>
          <h3>What is this platform?</h3>
          <p>
            The campus Lost & Found is a community-driven application designed to help 
            students, faculty, and staff reconnect with misplaced items. Whether you 
            dropped your keys in the library or found a stray ID card in the cafeteria, 
            this directory streamlines the process of returning belongings.
          </p>
        </section>

        <section>
          <h3>If you found an item</h3>
          <ol className="lf-steps">
            <li>Keep the item safe or hand it over to a trusted campus authority.</li>
            <li>Take a clear photo of the item (if possible).</li>
            <li>Go to the <Link to="/lost-and-found/report" className="lf-link">Report</Link> page and select "Found Item".</li>
            <li>Provide accurate details and a safe way for the owner to contact you.</li>
          </ol>
        </section>

        <section>
          <h3>Safety & Privacy</h3>
          <p>
            When meeting to return an item, we recommend choosing a public, 
            well-lit campus location during daylight hours. Do not share 
            sensitive personal information beyond what is strictly necessary 
            to coordinate the return.
          </p>
        </section>
      </div>
    </div>
  );
}
