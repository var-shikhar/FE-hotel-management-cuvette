import PublicFooter from "../../components/footer"
import { PublicHeader } from "../../components/header"

const PrivacyPolicy = () => {
  return (
    <div className="landing_container">
      <PublicHeader />
      <div className="landing_margin">
        <div className="landing_sub-wrapper">
          <h2>Privacy Policy</h2>

          <section className="terms-section">
            <h2 className="landing_sub-heading">1. Introduction</h2>
            <div className="landing_paragraph">
              Welcome to our Hotel Booking Platform ("Platform"). This Privacy
              Policy outlines how we collect, use, and protect your personal
              information when you browse, book, or interact with our services.
            </div>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">2. Information We Collect</h2>
            <ul className="unordered-list">
              <li>
                Personal details such as your name, email address, phone number,
                and ID proof when making a reservation.
              </li>
              <li>
                Booking history, stay preferences, payment details (processed
                securely via third-party providers).
              </li>
              <li>
                Device information, browser data, IP address, and geolocation
                through cookies and analytics tools.
              </li>
            </ul>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">
              3. How We Use Your Information
            </h2>
            <ul className="unordered-list">
              <li>
                To process reservations, send confirmations, and manage your
                stays efficiently.
              </li>
              <li>
                To personalize your experience based on preferences and past
                interactions.
              </li>
              <li>To communicate updates, offers, or respond to inquiries.</li>
              <li>
                To analyze usage and improve services, security, and customer
                support.
              </li>
            </ul>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">
              4. Data Sharing & Third Parties
            </h2>
            <ul className="unordered-list">
              <li>We never sell your data to external parties.</li>
              <li>
                Some data may be shared with trusted payment processors or hotel
                partners for booking fulfillment.
              </li>
              <li>
                We may integrate third-party tools for identity verification,
                fraud prevention, or analytics.
              </li>
            </ul>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">
              5. Data Protection & Security
            </h2>
            <ul className="unordered-list">
              <li>
                We use encryption protocols and secure servers to protect your
                data both in transit and at rest.
              </li>
              <li>
                Access to data is strictly limited to authorized hotel and
                platform personnel.
              </li>
            </ul>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">
              6. Cookies & Tracking Technologies
            </h2>
            <p className="landing_paragraph">
              Cookies help us improve your booking experience, track user
              behavior, and ensure smooth platform performance. You may manage
              cookie preferences via your browser settings.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">7. User Rights & Choices</h2>
            <ul className="unordered-list">
              <li>
                You can access, update, or request deletion of your personal
                data stored with us.
              </li>
              <li>You may opt out of marketing communications at any time.</li>
              <li>
                Contact our support team for any data-related requests or
                concerns.
              </li>
            </ul>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">8. Data Retention</h2>
            <p className="landing_paragraph">
              We retain user data only as long as necessary to fulfill booking
              obligations, legal requirements, or to enhance customer service.
              Some data may be anonymized for analytics and system optimization.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">
              9. Changes to Privacy Policy
            </h2>
            <p className="landing_paragraph">
              We may occasionally update this policy to reflect legal or service
              changes. Any significant changes will be communicated via email or
              the platform.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">10. Contact Information</h2>
            <div className="landing_paragraph">
              For any privacy-related questions, please contact us at
              privacy@hotelbooking.com.
            </div>
          </section>
        </div>
      </div>
      <PublicFooter />
    </div>
  )
}

export default PrivacyPolicy
