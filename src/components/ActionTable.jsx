export default function ActionTable({ actions }) {
  return (
    <table>
      <thead>
        <tr>
          <td>id</td>
          <td>action</td>
          <td>date</td>
          <td>points</td>
        </tr>
      </thead>
      <tbody>
        {actions.map((action) => {
            <tr>
                <td>{action.id}</td>
                <td>{action.action}</td>
                <td>{action.date}</td>
                <td>{action.points}</td>
            </tr>
        })}
      </tbody>
    </table>
  );
}
