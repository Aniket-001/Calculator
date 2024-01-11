import { useSelector } from 'react-redux'

export function useData1() {
  return useSelector((state) => state.num1);
}

export function useData2() {
  return useSelector((state) => state.num2);
}