namespace SafeSend.Stock.Api.Services;

//KycStoredFile is an immutable record that holds metadata about a saved KYC file,
//while IKycStorage defines a contract for saving, reading, and deleting those files.
//An interface is used instead of a class to allow swappable storage implementations, easier unit testing, and loose coupling via dependency injection.
//Example of Dependency inversion principle
public sealed record KycStoredFile(
    string StorageKey,
    string OriginalFileName,
    string ContentType,
    long SizeBytes
);

public interface IKycStorage
{
    Task<KycStoredFile> SaveAsync(
        string userName,      
        Stream fileStream,
        string originalFileName,
        string contentType,
        CancellationToken ct);

    Task<Stream> OpenReadAsync(string storageKey, CancellationToken ct);

    Task DeleteAsync(string storageKey, CancellationToken ct);
}