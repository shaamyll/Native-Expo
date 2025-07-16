import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';


type ProfileData = {
  name: string;
  profilePic: string;
};

//Update Profile Hook
export const useProfile = () => {
  const queryClient = useQueryClient();

  const query = useQuery<ProfileData>({
    queryKey: ['profile'],
    queryFn: async () => {
      const data = await AsyncStorage.getItem('profileData');
      return data ? JSON.parse(data) : { name: '', profilePic: '' };
    },
  });

  const mutation = useMutation({
    mutationFn: async (newProfile: ProfileData) => {
      await AsyncStorage.setItem('profileData', JSON.stringify(newProfile));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  return {
    profile: query.data,
    updateProfile: mutation.mutate
  };
};