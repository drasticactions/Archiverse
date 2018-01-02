using System;
using System.Collections.Generic;
using System.Text;

namespace MiiverseDatabase.Entities.Feeling
{
    public static class FeelingTypeHelpers
    {
        private const string NORMAL_FACE_SUFFIX = "_normal_face.png";
        private const string HAPPY_FACE_SUFFIX = "_happy_face.png";
        private const string LIKE_FACE_SUFFIX = "_like_face.png";
        private const string SURPRISED_FACE_SUFFIX = "_surprised_face.png";
        private const string FRUSTRATED_FACE_SUFFIX = "_frustrated_face.png";
        private const string PUZZLED_FACE_SUFFIX = "_puzzled_face.png";

        public static FeelingType DetectFeelingTypeFromIconUri(Uri iconUri)
        {
            if (iconUri.AbsolutePath.EndsWith(NORMAL_FACE_SUFFIX))
            {
                return FeelingType.Normal;
            }
            else if (iconUri.AbsolutePath.EndsWith(HAPPY_FACE_SUFFIX))
            {
                return FeelingType.Happy;
            }
            else if (iconUri.AbsolutePath.EndsWith(LIKE_FACE_SUFFIX))
            {
                return FeelingType.Like;
            }
            else if (iconUri.AbsolutePath.EndsWith(SURPRISED_FACE_SUFFIX))
            {
                return FeelingType.Surprised;
            }
            else if (iconUri.AbsolutePath.EndsWith(FRUSTRATED_FACE_SUFFIX))
            {
                return FeelingType.Frustrated;
            }
            else if (iconUri.AbsolutePath.EndsWith(PUZZLED_FACE_SUFFIX))
            {
                return FeelingType.Puzzled;
            }

            // "anonymous" shows as "Happy", so just say it's happy.
            return FeelingType.Happy;
        }

        public static Uri GetNormalFaceIconUri(Uri faceIconUri)
        {
            var feeling = DetectFeelingTypeFromIconUri(faceIconUri);
            return GetNormalFaceIconUri(faceIconUri);
        }

        public static Uri GetNormalFaceIconUri(Uri faceIconUri, FeelingType feeling)
        {
            if (feeling == FeelingType.Normal)
            {
                return faceIconUri;
            }

            var uriText = faceIconUri.ToString();
            return new Uri(uriText.Substring(0, uriText.Length - GetFeelingSuffixText(feeling).Length) + NORMAL_FACE_SUFFIX);
        }

        private static string GetFeelingSuffixText(FeelingType feeling)
        {
            switch (feeling)
            {
                case FeelingType.Normal:
                    return NORMAL_FACE_SUFFIX;

                case FeelingType.Happy:
                    return HAPPY_FACE_SUFFIX;

                case FeelingType.Like:
                    return LIKE_FACE_SUFFIX;

                case FeelingType.Surprised:
                    return SURPRISED_FACE_SUFFIX;

                case FeelingType.Frustrated:
                    return FRUSTRATED_FACE_SUFFIX;

                case FeelingType.Puzzled:
                    return PUZZLED_FACE_SUFFIX;
            }

            throw new Exception();
        }
    }
}
