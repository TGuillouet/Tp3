import React from "react";

function TopBar(props: any) {
    const [ valueState, setValue ] = React.useState("");

    const onSubmit = (e: any) => {
        e.preventDefault();

        props.onSubmit(valueState);
    };

    const onChange = ({ target: { value } }: any) => {
        setValue(value);
    };

    return (
        <div style={{ height: "5vh" }} className="level">
            <div className="level-left">
            </div>
            <div className="level-right">
                <div className="level-item">
                    <form className="field has-addons" onSubmit={onSubmit}>
                        <p className="control is-marginless">
                            <input className={"input"} placeholder="Nom d'utlisateur" value={valueState} onChange={onChange} />
                        </p>
                        <p className="control">
                            <button className="button" type="submit">
                                Ajouter un utilisateur
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default TopBar;
