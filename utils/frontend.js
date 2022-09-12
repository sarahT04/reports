export const toDate = (str) => new Date(str).toLocaleString("en-US", { year: 'numeric', month: 'short', day: 'numeric', hour12: false, hour: '2-digit', minute: '2-digit' });
