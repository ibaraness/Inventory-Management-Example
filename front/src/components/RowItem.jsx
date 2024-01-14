export default function RowItem({isHead = false, children}){
    return (
        <div className={`basis-1/4 ${isHead ?' text-black font-bold uppercase' :'text-slate-600'}  text-lg mx-4`}>{children}</div>
    )
}