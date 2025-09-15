import { parse } from 'json2csv';

export function exportCsv(items: any[]) {
  const records = items.map((i) => ({
    id: i.id,
    type: i.type,
    amount: i.amount,
    category: i.category,
    description: i.description,
    date: i.date
  }));
  return parse(records);
}
