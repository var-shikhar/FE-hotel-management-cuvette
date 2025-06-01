import { Link } from "react-router-dom"
import ARROW_IMAGE from "../../assets/arrow.svg"
import BACKGOURND_1 from "../../assets/bg-1.svg"
import BUCKET_IMAGE from "../../assets/bucket.svg"
import CHECK_ICON from "../../assets/check.svg?react"
import HERO_NOTIFICATION_IMAGE from "../../assets/hero-notification.svg"
import HERO_SALES_IMAGE from "../../assets/hero-sales.svg"
import ADOBE_ICON from "../../assets/logo/adobe.svg?react"
import AIRTABLE_ICON from "../../assets/logo/airtable.svg?react"
import ELASTIC_ICON from "../../assets/logo/elastic.svg?react"
import FRAMER_ICON from "../../assets/logo/framer.svg?react"
import OPENDOOR_ICON from "../../assets/logo/opendoor.svg?react"
import VIDEO_ICON from "../../assets/play.svg"
import SOCIAL_GROUP_IMAGE from "../../assets/socials.svg"
import Button from "../../components/button"
import "../../components/css/landing.css"
import PublicFooter from "../../components/footer"
import { PublicHeader } from "../../components/header"
import LinkButton from "../../components/link-btn"

const LandingPage = () => {
  return (
    <div className="landing_container">
      <PublicHeader />
      <div className="landing_margin">
        {/* Hero Section */}
        <div className="landing_hero-container">
          <div className="landing_hero-section">
            <h2 className="landing_hero-title">
              Simplify Hotel Bookings with Hubly
            </h2>
            <div className="landing_hero-paragraph">
              Manage reservations, optimize guest experiences, and grow your
              hospitality business — all in one powerful platform.
            </div>
            <div>
              <Link to="/auth/sign-up" className="no_decoration">
                <Button color="primary" icon={ARROW_IMAGE} iconPosition="right">
                  Get started
                </Button>
              </Link>
              <span className="landing_hero-video">
                <img src={VIDEO_ICON} alt="video" width={12} height={12} />
                Watch Demo
              </span>
            </div>
          </div>
          <div className="landing_hero-image-wrapper">
            <img src={HERO_NOTIFICATION_IMAGE} alt="hero-notification-image" />
            <img src={HERO_SALES_IMAGE} alt="hero-sales-image" />
            <img src={BACKGOURND_1} alt="hero-bg-image" />
          </div>
        </div>
      </div>

      <div className="landing_icons-wrapper">
        <div className="landing_icons-container landing_margin">
          {[
            ADOBE_ICON,
            ELASTIC_ICON,
            OPENDOOR_ICON,
            AIRTABLE_ICON,
            FRAMER_ICON,
          ].map((ICON, i) => (
            <ICON className="landing_icons" key={i} />
          ))}
        </div>
      </div>

      <div className="landing_margin">
        {/* Hotel Booking Features Section */}
        <div className="landing_crm-section">
          <div className="landing_hero-descrion">
            <h3 className="landing_heading">Tailored for Hotel Management</h3>
            <div className="landing_paragraph">
              Hubly helps hotels streamline booking processes, manage guest
              data, and automate communication — allowing you to focus on
              exceptional hospitality.
            </div>
          </div>

          <div className="crm-section">
            <div className="crm-text-group">
              <div>
                <h4>SMART BOOKINGS</h4>
                <div>
                  Enable real-time room reservations and calendar
                  synchronization with ease.
                </div>
              </div>
              <div>
                <h4>GUEST EXPERIENCE</h4>
                <div>
                  Automated email reminders, personalized offers, and post-stay
                  feedback forms.
                </div>
              </div>
              <div>
                <h4>INSIGHTS</h4>
                <div>
                  Track occupancy, revenue trends, and customer reviews through
                  a powerful dashboard.
                </div>
              </div>
            </div>

            <div className="crm-graphic">
              <img src={BUCKET_IMAGE} alt="Booking Funnel" className="funnel" />
              <div className="crm-icons">
                <img src={BACKGOURND_1} alt="icon" className="crm-bg" />
                <img
                  src={SOCIAL_GROUP_IMAGE}
                  alt="icon"
                  className="crm-social"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Hotel Pricing Section */}
        <div className="landing_pricing-section">
          <div className="landing_hero-descrion">
            <h3 className="landing_heading">
              Flexible Pricing for Every Hotel
            </h3>
            <div className="landing_paragraph">
              Whether you're running a boutique inn or a multi-location chain,
              Hubly offers pricing that scales with your needs.
            </div>
          </div>

          <div className="pricing-container">
            {HOTEL_PRICING_CARD?.map((item) => (
              <div className="pricing-card" key={item.plan}>
                <h3>{item.plan}</h3>
                <div className="description">{item.description}</div>
                <div className="price">{item.price}</div>
                <div className="features-title">What's included</div>
                <div className="feature-list">
                  {item.features?.map((feature, idx) => (
                    <div className="feature" key={idx}>
                      <CHECK_ICON className="check-icon" />
                      <span className="feature-text">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="pricing-button">
                  <LinkButton
                    text={item.buttonText}
                    isLight
                    redirectTo={"../auth/sign-up"}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PublicFooter />
    </div>
  )
}

export default LandingPage

const HOTEL_PRICING_CARD = [
  {
    plan: "ESSENTIALS",
    description:
      "Perfect for small hotels and B&Bs looking to digitize bookings.",
    price: "$99/month",
    features: [
      "Online Room Booking",
      "Guest Contact Management",
      "Automated Emails & Reminders",
      "Daily Reports",
      "Basic Support",
    ],
    buttonText: "SIGN UP FOR ESSENTIALS",
  },
  {
    plan: "PREMIUM",
    description:
      "For mid-sized to large hotels needing automation, insights, and integrations.",
    price: "$299/month",
    features: [
      "Multi-property Management",
      "Advanced Analytics",
      "Third-Party Channel Integration",
      "Guest Feedback & Surveys",
      "Priority Support",
    ],
    buttonText: "SIGN UP FOR PREMIUM",
  },
] as const
