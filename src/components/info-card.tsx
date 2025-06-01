const InfoCard = ({
  title,
  value,
  icon,
}: {
  title: string
  value: number
  icon: string
}) => (
  <div className="info-card">
    <div className="icon-wrapper">
      <img src={icon} className="info-icon" alt="icon" />
    </div>
    <div>
      <div className="info-value">{value}</div>
      <div className="info-title">{title}</div>
    </div>
  </div>
)

export default InfoCard
