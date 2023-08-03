const Filters = () => {

    return (
        <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
            <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">filters</label>
        </div> 
        <div className="drawer-side">
            <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li><a></a></li>
            <li><a>Sidebar Item 2</a></li>
            </ul>
        </div>
        </div>
    )
}

export default Filters;