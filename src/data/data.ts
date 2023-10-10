import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Category {
  id: string; // Unique identifier for the category
  name: string;
  icon: string; // Add an icon property to store the icon name or URL
  // Add other category properties as needed
}

export interface Activity {
  id: string; // Unique identifier for the activity
  name: string;
  categoryId: string; // Reference to the category it belongs to
  // Add other activity properties as needed
}

export interface Entry {
  id: string; // Unique identifier for the entry
  value: number | boolean;
  activityId: string; // Reference to the activity it belongs to
  timestamp: number;
  isBoolean: boolean;
  // Add other entry properties as needed
}

// Define keys for AsyncStorage
export const CATEGORIES_KEY = 'categories';
export const ACTIVITIES_KEY = 'activities';
export const ENTRIES_KEY = 'entries';

// export const addCategory = async (category: Category) => {
//   try {
//     const existingCategoriesString = await AsyncStorage.getItem(CATEGORIES_KEY);
//     const existingCategories: Category[] = existingCategoriesString
//       ? JSON.parse(existingCategoriesString)
//       : [];

//     // Generate a unique ID for the new category
//     category.id = generateUniqueId();

//     const updatedCategories = [...existingCategories, category];

//     await AsyncStorage.setItem(
//       CATEGORIES_KEY,
//       JSON.stringify(updatedCategories),
//     );
//     return updatedCategories;
//   } catch (error) {
//     console.error('Error adding category to AsyncStorage:', error);
//     throw error;
//   }
// };

export const addCategory = async (category: Category) => {
  try {
    const existingCategoriesString = await AsyncStorage.getItem(CATEGORIES_KEY);
    const existingCategories: Category[] = existingCategoriesString
      ? JSON.parse(existingCategoriesString)
      : [];

    // Check if a category with the same name already exists
    const duplicatedCat = existingCategories.filter(
      (existingCategory, index) => {
        const duplicate =
          existingCategory.id.toLowerCase() === category.id?.toLowerCase();

        if (duplicate) {
          console.warn('Category already exists and will be updated');
          existingCategories[index] = category;
        }

        return duplicate;
      },
    );

    const updatedCategories = [...existingCategories];

    if (duplicatedCat.length) {
      console.warn('Category already exists and will be updated');
    } else {
      // Generate a unique ID for the new category
      category.id = generateUniqueId();
      updatedCategories.push(category);
    }

    await AsyncStorage.setItem(
      CATEGORIES_KEY,
      JSON.stringify(updatedCategories),
    );
    return updatedCategories;
  } catch (error) {
    console.error('Error adding category to AsyncStorage:', error);
    throw error;
  }
};

export const addActivity = async (activity: Activity) => {
  try {
    const existingActivitiesString = await AsyncStorage.getItem(ACTIVITIES_KEY);
    const existingActivities: Activity[] = existingActivitiesString
      ? JSON.parse(existingActivitiesString)
      : [];

    // Generate a unique ID for the new activity
    activity.id = generateUniqueId();

    const updatedActivities = [...existingActivities, activity];

    await AsyncStorage.setItem(
      ACTIVITIES_KEY,
      JSON.stringify(updatedActivities),
    );
    return updatedActivities;
  } catch (error) {
    console.error('Error adding activity to AsyncStorage:', error);
    throw error;
  }
};

export const addEntry = async (entry: Entry) => {
  try {
    const existingEntriesString = await AsyncStorage.getItem(ENTRIES_KEY);
    const existingEntries: Entry[] = existingEntriesString
      ? JSON.parse(existingEntriesString)
      : [];

    // Generate a unique ID for the new entry
    entry.id = generateUniqueId();

    const updatedEntries = [...existingEntries, entry];

    await AsyncStorage.setItem(ENTRIES_KEY, JSON.stringify(updatedEntries));
    return updatedEntries;
  } catch (error) {
    console.error('Error adding entry to AsyncStorage:', error);
    throw error;
  }
};

// Function to retrieve all categories
export const getCategories = async (): Promise<Category[]> => {
  try {
    const categoriesString = await AsyncStorage.getItem(CATEGORIES_KEY);
    return categoriesString ? JSON.parse(categoriesString) : [];
  } catch (error) {
    console.error('Error retrieving categories from AsyncStorage:', error);
    throw error;
  }
};

// Function to retrieve all activities
export const getActivities = async (): Promise<Activity[]> => {
  try {
    const activitiesString = await AsyncStorage.getItem(ACTIVITIES_KEY);
    return activitiesString ? JSON.parse(activitiesString) : [];
  } catch (error) {
    console.error('Error retrieving activities from AsyncStorage:', error);
    throw error;
  }
};

export const getActivity = async (activityId: string): Promise<Activity> => {
  try {
    const activities = await getActivities();
    const activity = activities.find(activity => activity.id === activityId);
    if(activity){
      return activity
    } else {
      throw new Error(`Activity ${activityId} does not exist in database`)
    }
  } catch (error) {
    console.error('Error retrieving activities from AsyncStorage:', error);
    throw error;
  }
};

export const getCategoryActivities = async (
  categoryId: string,
): Promise<Activity[]> => {
  try {
    const activities = await getActivities();
    const catActivities = activities.filter(
      activity => activity.categoryId === categoryId,
    );
    return catActivities;
  } catch (error) {
    console.error('Error retrieving activities from AsyncStorage:', error);
    throw error;
  }
};

// Function to retrieve all entries
export const getEntries = async (): Promise<Entry[]> => {
  try {
    const entriesString = await AsyncStorage.getItem(ENTRIES_KEY);
    console.log('all entries', entriesString);
    return entriesString ? JSON.parse(entriesString) : [];
  } catch (error) {
    console.error('Error retrieving entries from AsyncStorage:', error);
    throw error;
  }
};

export const getActivityEntries = async (
  activityId: string,
): Promise<Entry[]> => {
  try {
    const entries = await getEntries();
    return entries.filter(ent => ent.activityId === activityId);
  } catch (error) {
    console.error('Error retrieving entries from AsyncStorage:', error);
    throw error;
  }
};

export const deleteAllCategories = async () => {
  try {
    // Delete all categories from AsyncStorage
    await AsyncStorage.removeItem(CATEGORIES_KEY);
    await AsyncStorage.removeItem(ACTIVITIES_KEY);
    await AsyncStorage.removeItem(ENTRIES_KEY);
  } catch (error) {
    // Handle any errors that may occur during deletion
    console.error('Error deleting categories from AsyncStorage:', error);
    throw error;
  }
};

const generateUniqueId = () => {
  return Date.now().toString();
};
