export interface DataTableSearchProps {
    /** Placeholder text */
    placeholder?: string;
    /** Additional CSS classes */
    class?: string;
}
import { Search } from '@lucide/svelte';
declare const Search: import("svelte").Component<DataTableSearchProps, {}, "">;
type Search = ReturnType<typeof Search>;
export default Search;
