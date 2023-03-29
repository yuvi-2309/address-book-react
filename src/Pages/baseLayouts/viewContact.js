import React from "react";


export default function View(props) {
    return (
        <div>
            <h1>{props.first_name} {props.last_name}</h1>
            <div>
                <div>
                    <h2>Addresses</h2>
                    <div>{props.type_address}</div>
                    {props.address_line1}
                    {props.address_line2}
                    {props.city} {props.state}
                    {props.country} - {props.pin_code}                    
                </div>
                <div>
                    <h2>Email Address</h2>
                    <div>{props.type_email}</div>
                    {props.email}
                </div>
                <div>
                    <h2>Phone number</h2>
                    <div>{props.type_phone}</div>
                    {props.phone_number}
                </div>
            </div>
            
        </div>
    )
}