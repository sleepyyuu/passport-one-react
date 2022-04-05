export default function ExpeditedToggler(props) {
  const { expedited, setExpedited } = props;
  return (
    <div className="expediteToggleContainer">
      <button
        className={expedited ? "selectedExpediteButton" : "expediteToggleButton"}
        onClick={() => {
          setExpedited((expedited) => {
            return true;
          });
        }}
      >
        Expedited Renewals
      </button>
      <button
        className={expedited ? "expediteToggleButton" : "selectedExpediteButton"}
        onClick={() => {
          setExpedited((expedited) => {
            return false;
          });
        }}
      >
        Regular Renewals
      </button>
    </div>
  );
}
