import { useLayoutEffect, useEffect } from "react";

export const useEffectLayout =  typeof window !== "undefined" ? useLayoutEffect : useEffect;
