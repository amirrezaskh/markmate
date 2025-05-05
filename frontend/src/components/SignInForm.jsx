import { useEffect, useState } from "react"
import { useAnyKeyRender } from "../hooks";

export default function SingInForm() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [fullName, setFullName] = useState("");

    const editFullName = () => {
        setFullName(firstName + " " + lastName);
    }

    useEffect(() => {
        console.log(firstName);
    }, [firstName]);

    useEffect(() => {
        console.log(lastName);
    }, [lastName]);

    useEffect(() => {
        console.log(fullName);
    }, [fullName])

    return (
        <div className="form">
            <input 
                type="text"
                value={firstName}
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
            />
            <input 
                type="text"
                value={lastName}
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
            />
            <input type="button" value="Save" onClick={editFullName} />
            <p>{fullName}</p>
        </div>
    )
}