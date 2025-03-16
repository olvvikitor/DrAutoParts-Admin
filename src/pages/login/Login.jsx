import React from 'react';
import { Link } from 'react-router';
export default function Login() {



    return (
        <>
            <h1>Login</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem magnam veniam obcaecati doloribus dignissimos ea mollitia, quam quas voluptates earum corrupti atque id voluptatem quos necessitatibus dolore ex repudiandae. Tempora.
            </p>

            <Link to="/home">
                <button >Entrar</button>
            </Link>
        </>
    );
}