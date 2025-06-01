import PublicFooter from "../../components/footer"
import { PublicHeader } from "../../components/header"

const TermsAndConditions = () => {
  return (
    <div className="landing_container">
      <PublicHeader />
      <div className="landing_margin">
        <div className="landing_sub-wrapper">
          <h2>Terms & Conditions</h2>

          <section className="terms-section">
            <h2 className="landing_sub-heading">1. Introduction</h2>
            <div className="landing_paragraph">
              Welcome to our Hotel Booking Platform ("Platform"). These Terms &
              Conditions govern your use of our services, including booking
              accommodations, managing reservations, and related hotel services.
              By accessing or using the Platform, you agree to comply with these
              terms.
            </div>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">2. Definitions</h2>
            <ul className="unordered-list">
              <li>
                "Platform" refers to the online hotel booking system we provide.
              </li>
              <li>
                "User" means any individual or entity using our services to book
                hotel rooms.
              </li>
              <li>
                "Hotel Partner" refers to the establishments listed and bookable
                through the Platform.
              </li>
              <li>
                "Booking Information" includes reservation details, guest data,
                and payment-related information.
              </li>
            </ul>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">3. User Accounts & Access</h2>
            <ul className="unordered-list">
              <li>
                Users may be required to register and provide personal
                information to complete a reservation.
              </li>
              <li>
                All submitted information must be truthful, complete, and
                current.
              </li>
              <li>
                We reserve the right to suspend accounts in cases of suspicious
                activity or policy violations.
              </li>
            </ul>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">4. Use of Booking Services</h2>
            <ul className="unordered-list">
              <li>
                Users must use the Platform solely for legitimate reservation
                purposes.
              </li>
              <li>
                Attempting fraudulent bookings or abusing the service may result
                in suspension.
              </li>
              <li>
                Room availability and rates are subject to change without notice
                until confirmed.
              </li>
            </ul>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">5. Booking Policies</h2>
            <ul className="unordered-list">
              <li>
                Each hotel may have specific policies for cancellations,
                check-ins, and refunds.
              </li>
              <li>
                Users are responsible for reviewing and accepting individual
                hotel terms at the time of booking.
              </li>
              <li>
                We are not liable for any disputes between users and hotel
                partners regarding room conditions or services.
              </li>
            </ul>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">6. Code of Conduct</h2>
            <ul className="unordered-list">
              <li>
                Users must behave respectfully during their stay and follow
                hotel rules at all times.
              </li>
              <li>
                Any misconduct may lead to denied service or legal action from
                the hotel.
              </li>
            </ul>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">7. Intellectual Property</h2>
            <div className="landing_paragraph">
              All content, software, branding, and visuals on the Platform are
              the intellectual property of the Hotel Booking service. You may
              not reproduce, modify, or distribute any materials without
              permission.
            </div>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">8. Limitation of Liability</h2>
            <p className="landing_paragraph">
              We are not liable for losses arising from hotel service issues,
              unavailability of accommodations, technical errors, or inaccurate
              listings. Users accept all bookings at their own discretion.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">9. Privacy Policy</h2>
            <p className="landing_paragraph">
              Our Privacy Policy explains how we handle your personal data.
              Continued use of the Platform indicates your agreement with our
              data handling practices.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">
              10. Termination & Suspension
            </h2>
            <ul className="unordered-list">
              <li>
                We reserve the right to suspend or terminate access for
                violations of these terms.
              </li>
              <li>
                Users may request deletion of their account and related data at
                any time.
              </li>
            </ul>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">11. Changes to Terms</h2>
            <p className="landing_paragraph">
              These Terms & Conditions may be updated from time to time. Major
              changes will be announced on the Platform, and continued use
              implies acceptance of the updated terms.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">12. Contact Information</h2>
            <div className="landing_paragraph">
              For any legal, policy-related, or general inquiries, please
              contact us at support@hotelbooking.com.
            </div>
          </section>
        </div>
      </div>

      <PublicFooter />
    </div>
  )
}

export default TermsAndConditions
