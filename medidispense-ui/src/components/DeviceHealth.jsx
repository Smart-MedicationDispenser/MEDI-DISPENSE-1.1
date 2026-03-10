export default function DeviceHealth() {

  return (
    <div className="device-health-card">

      <h3>Device Health</h3>

      <div className="health-row">
        <span>Online Devices</span>
        <span className="ok">5</span>
      </div>

      <div className="health-row">
        <span>Offline Devices</span>
        <span className="warn">1</span>
      </div>

      <div className="health-row">
        <span>Battery Low</span>
        <span className="warn">1</span>
      </div>

    </div>
  )

}