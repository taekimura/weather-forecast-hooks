import React from 'react';
import { Image } from "react-bootstrap";

import "./locationpic.styles.scss";

export default function Unsplash ({picture}) {
    return(
    <>
    <div className="unsplash">
        <Image  src={picture} ></Image>
    </div>
    </>
    )
}