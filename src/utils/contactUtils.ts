const VIP_CONTACTS = ['John Doe', 'Lucas Martinez', 'Emma Brown'];

export const isVIPContact = (name: string) => VIP_CONTACTS.includes(name);

export const getContactPriority = (name: string) => {
  const index = VIP_CONTACTS.indexOf(name);
  return index === -1 ? 999 : index;
};