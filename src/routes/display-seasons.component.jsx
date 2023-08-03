const DisplaySeasons = () => {
    return(


        <div className="overflow-x-auto">
    <table className="table">
        {/* head */}
        <thead>
        <tr>
            <th></th>
            <th>Season Title</th>
            <th> Date Released</th>
            <th> Number of Episodes </th>
            <th> Rating </th>
        </tr>
        </thead>
        <tbody>
        {/* row 1 */}
        <tr className= "hover">
            <th>1</th>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>Blue</td>
        </tr>
        {/* row 2 */}
        <tr className="hover">
            <th>2</th>
            <td>Hart Hagerty</td>
            <td>Desktop Support Technician</td>
            <td>Purple</td>
        </tr>
        {/* row 3 */}
        <tr className="hover">
            <th>3</th>
            <td>Brice Swyre</td>
            <td>Tax Accountant</td>
            <td>Red</td>
        </tr>
        </tbody>
    </table>
    </div>
    )
    }

export default DisplaySeasons;