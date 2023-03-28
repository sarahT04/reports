import SeeReport from "../../../components/SeeReport";

export default function AdminClassReport({ class_id }) {
  return (
    <SeeReport class_id={class_id} apiType="situations" />
  )
}
