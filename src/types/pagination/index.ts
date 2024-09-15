export type Page<T> = {
    content: T[];             // Array of items in the current page
    totalPages: number;       // Total number of pages available
    totalElements: number;    // Total number of elements across all pages
    size: number;             // Number of items per page
    number: number;           // Current page number (0-indexed)
};