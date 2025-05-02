import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const User = ({ name, imageUrl }) => {
  // Handle the case where name is undefined or an empty string
  const validName = name || "";
  const nameParts = validName.trim().split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  const finalInitials = initials || "XX"; // Fallback initials

  return (
    <div className="flex items-center gap-3">
      <Avatar>
        {imageUrl ? (
          <AvatarImage src={imageUrl} alt={name} />
        ) : (
          <AvatarFallback>{finalInitials}</AvatarFallback>
        )}
        <div className="absolute inset-0 rounded-full border border-gray-200" />
      </Avatar>
      <span className="font-medium text-gray-800">{name}</span>
    </div>
  );
};

export default User;
