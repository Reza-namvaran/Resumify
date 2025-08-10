import React from "react";
import { useParams } from "react-router-dom";

export default function EditResumePage() {
    const { id } = useParams;
    return <h1 className="text-2xl font-semibold">Edit Resume Page - ID: {id}</h1>;
}