import Head from "next/head";
import dynamic from 'next/dynamic';
import { useState } from "react";

const NoSSREditor = dynamic(() => import("../components/TextEditor"), { ssr: false });

export default function Write() {
    return (
        <div>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <header></header>
            <main>
                <NoSSREditor />
            </main>
        </div>
    );
}
