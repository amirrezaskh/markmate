import { useContext } from "react";
import { AssignmentContext } from "../contexts";

export default function useTheme() {
    return useContext(AssignmentContext);
}