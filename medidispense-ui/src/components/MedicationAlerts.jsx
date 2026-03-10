export default function MedicationAlerts() {

  return (
    <div className="med-alert-card">

      <h3>Medication Alerts</h3>

      <div className="alert-row">
        <span>Metformin</span>
        <span className="low">Low Stock</span>
      </div>

      <div className="alert-row">
        <span>Insulin</span>
        <span className="refill">Refill Needed</span>
      </div>

      <div className="alert-row">
        <span>Paracetamol</span>
        <span className="critical">Critical</span>
      </div>

    </div>
  )

}