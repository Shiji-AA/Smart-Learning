

function Hello() {
    return (
        <div className="relative w-full mx-auto my-auto">
            <h1 className="text-2xl font-bold mb-4">Topics Recommended for You</h1>
            
            <div className="grid grid-cols-5 gap-4 px-4">
                <div className="w-26 h-14 border border-gray-400 flex items-center justify-center">
                    React Hooks
                </div>
                <div className="w-26 h-14 border border-gray-400 flex items-center justify-center">
                    Javascript
                </div>
                <div className="w-26 h-14 border border-gray-400 flex items-center justify-center">
                    Node JS
                </div>
                <div className="w-26 h-14 border border-gray-400 flex items-center justify-center">
                    Mongo DB
                </div>
                <div className="w-26 h-14 border border-gray-400 flex items-center justify-center">
                    Typescript
                </div>
                <div className="w-26 h-14 border border-gray-400 flex items-center justify-center">
                    Express JS
                </div>
                <div className="w-26 h-14 border border-gray-400 flex items-center justify-center">
                    Redux
                </div>
                <div className="w-26 h-14 border border-gray-400 flex items-center justify-center">
                    PostgreSQL
                </div>
                <div className="w-26 h-14 border border-gray-400 flex items-center justify-center">
                    React 
                </div>
                <div className="w-26 h-14 border border-gray-400 flex items-center justify-center">
                    HTML
                </div>
                {/* Add more items here */}
            </div>
        </div>
    );
}

export default Hello;
