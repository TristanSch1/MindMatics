const SelectPlayer = (props) => {
  return (
    <button
      className="bg-slate-500 hover:bg-slate-600 border border-slate-50 p-1 md:p-4"
      onClick={() => {
        props.playerSelected
          ? props.setPlayerSelected("")
          : props.setPlayerSelected(props.user);
      }}
    >
      {props.playerSelected ? `See all results` : `See my results`}
    </button>
  );
};

export default SelectPlayer;
