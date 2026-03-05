// Verify Firebase ID token using Firebase REST API (no firebase-admin needed)
export const verifyFirebaseToken = async (
  idToken: string,
): Promise<{ email: string; name: string }> => {
  const apiKey = process.env.FIREBASE_API_KEY;
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });

  if (!response.ok) {
    throw { status: 401, message: "Invalid Firebase token" };
  }

  const data = (await response.json()) as {
    users?: { email: string; displayName?: string }[];
  };

  const firebaseUser = data.users?.[0];
  if (!firebaseUser?.email) {
    throw { status: 401, message: "Invalid Firebase token" };
  }

  return {
    email: firebaseUser.email,
    name: firebaseUser.displayName ?? firebaseUser.email.split("@")[0],
  };
};
